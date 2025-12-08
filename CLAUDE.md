# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TypeFS** is a unified abstraction layer for file storage operations across multiple backends (local filesystem, S3, etc.). It provides a single consistent API regardless of the underlying storage driver.

- **Type**: TypeScript/Node.js npm package
- **Package**: `typefs` (v1.1.4)
- **License**: MIT
- **Main Entry**: `dist/index.js` (compiled from `lib/`)
- **Node.js Support**: 20.x and 22.x

## Common Development Commands

```bash
# Build and validate before pushing (recommended for PRs)
npm run pr

# Watch mode for iterative development
npm run watch

# Run all tests
npm test

# Run specific test suites
npm run test-file-driver      # Test FileDriver implementation
npm run test-util              # Test utility functions
npm run test-manual            # Run integration tests with real filesystem

# Code quality
npm run lint                   # Check ESLint violations
npm run fix                    # Auto-fix linting issues
npm run audit                  # Security vulnerability check

# Coverage reporting
npm run coverage               # Generate HTML coverage report (opens in browser)
npm run coverage-ci            # Generate LCOV format for CI
```

## Architecture Overview

TypeFS uses a **driver-based singleton pattern** with pluggable storage backends:

### Core Components

1. **Storage Manager** (`lib/storage.ts`)
   - Central singleton for configuring and accessing disk drivers
   - Static methods: `config`, `disk()`, `registerDriver()`, `getInstance()`
   - Manages driver instances and configuration
   - Enables runtime driver registration for extensibility
   - **Must be configured** with a `Configuration` object in your entry file before use

2. **DiskDriver Interface** (from `typefs-registry` dependency)
   - Abstract base class defining the standard file operations API
   - All drivers (FileDriver, S3Driver, etc.) extend this interface
   - Ensures consistent method signatures across all backends

3. **FileDriver** (`lib/drivers/file-driver.ts`)
   - Concrete implementation for local filesystem operations
   - **Bundled with TypeFS** - no additional installation needed
   - Configuration options:
     - `root`: Absolute path defining the disk root directory
     - `jail`: Boolean enabling path jailing (recommended: `true`)
   - DiskDriver API methods:
     - **File Operations**: `read()`, `readStream()`, `write()`, `writeStream()`, `copy()`, `move()`, `deleteFile()`, `deleteDirectory()`
     - **Directory Operations**: `createDirectory()`, `listContents()`, `exists()`
     - **Metadata**: `fileSize()`, `lastModified()`
   - Path jailing prevents access outside root (prevents `../` directory traversal attacks)

4. **Configuration System** (`lib/config.ts`)
   - Required: `Configuration` object with `default` and `disks` properties
   - Each disk requires: `driver`, `root`, `jail` settings
   - Multiple disks can be configured with different roots and drivers
   - Example config: `config/filesystem.js`

### Data Flow

```
User Code
    ↓
Storage.disk(diskName)  ← returns driver instance from config
    ↓
FileDriver / S3Driver / Custom Driver (implements DiskDriver)
    ↓
File System / S3 / etc.
```

### Design Patterns

- **Singleton**: Storage class manages single instance
- **Factory**: Driver registration and instantiation via `registerDriver()`
- **Strategy**: Pluggable drivers for different backends
- **Adapter**: DiskDriver adapts different backends to common interface
- **Barrel Exports**: `index.ts` files re-export modules

## Directory Structure

```
lib/
├── index.ts                    # Main barrel export
├── storage.ts                  # Storage singleton manager
├── config.ts                   # Configuration type definitions
└── drivers/
    ├── index.ts                # Driver exports barrel
    └── file-driver.ts          # Local filesystem driver

test/
├── storage.test.ts             # Storage manager tests
├── file-driver.test.ts         # FileDriver unit tests
├── util.test.ts                # Utility function tests
└── manual/                     # Integration tests

config/
└── filesystem.js               # Example filesystem configuration
```

## Key Architectural Principles

1. **Security First**: Path jailing prevents directory traversal attacks by default
2. **Extensibility**: New drivers can be registered at runtime without modifying core code
3. **Type Safety**: Strict TypeScript typing throughout
4. **Error Handling**: Descriptive error messages with context
5. **Efficiency**: Stream support for large files avoids loading into memory

## Testing Strategy

**Framework**: Mocha (BDD) + Chai assertions + Sinon mocks + mock-fs

**Test Organization**:
- Unit tests mock the filesystem with `mock-fs`
- FileDriver tests verify core functionality and security
- Storage tests verify manager initialization and configuration
- Manual tests run against real filesystem for integration validation
- Timeout: 1200000ms (20 minutes) for manual tests

**Key Test Coverage**:
- Driver initialization
- Path jailing security (prevent `../` traversal)
- Stream operations (read/write)
- Recursive directory operations
- File metadata and operations (copy, move, delete)
- Configuration loading

## Code Quality Standards

**ESLint Configuration** (`.eslintrc.json`):
- Base: Airbnb style guide
- Plugins: `sonarjs`, `mocha`, `jsdoc`, `import`
- Key rules:
  - JSDoc required for all functions with descriptions
  - No `console.log` (must use proper logging)
  - No arrow functions in Mocha tests (use `function()`)
  - No hardcoded credentials
  - Strict mode enforced

**When Making Changes**:
```bash
npm run lint          # Check for issues
npm run fix           # Auto-fix formatting and common issues
npm test              # Verify all tests pass
npm run coverage      # Check coverage didn't decrease
```

## CI/CD Pipeline

**GitHub Actions** (`/.github/workflows/`):

- **ci.yml**: Runs on every commit (lint → build → test on Node 20.x, 22.x, multiple OS)
- **publish.yml**: Auto-publishes to npm on main branch after testing
- **coverage.yml**: Uploads coverage to codecov.io
- **codeql-analysis.yml**: Security scanning
- **documentation.yml**: Builds documentation

**Key Requirements**:
- All tests must pass
- ESLint must pass
- Security audit must pass (moderate level)
- Coverage reports must be generated

## Configuration

**TypeScript** (`tsconfig.json`):
- Strict mode enabled (`strict: true`)
- Targets ES2020
- Module resolution for CommonJS/ES modules
- Type declarations generated

**Mocha** (`.mocharc.json`):
- Uses ts-node for TypeScript execution
- Test pattern: `test/*.test.ts`
- Slow test threshold: 75ms
- Timeout: 1200000ms (manual tests can be slow)

## Dependency Management

**Runtime**:
- `typefs-registry` (^2.0.0): Base DiskDriver interface and types

**Key Dev Dependencies**:
- TypeScript 5.5.4
- Mocha 10.7.3 (test framework)
- Chai 4.5.0 (assertions)
- ts-node (TypeScript execution)
- mock-fs (filesystem mocking)
- Sinon (spies/stubs)
- ESLint (linting)
- NYC (code coverage)

**Renovate** (`renovate.json`):
- Automatically creates PRs for dependency updates
- Groups all dependencies in single PR
- Auto-merge disabled (manual review required)

## Common Development Tasks

### Adding a New Driver

1. Create `lib/drivers/your-driver.ts` extending `DiskDriver`
2. Implement all DiskDriver API methods:
   - File operations: `read()`, `readStream()`, `write()`, `writeStream()`, `copy()`, `move()`, `deleteFile()`, `deleteDirectory()`
   - Directory operations: `createDirectory()`, `listContents()`, `exists()`
   - Metadata: `fileSize()`, `lastModified()`
3. Register in user code: `Storage.registerDriver('your-type', YourFactory)`
4. Write tests in `test/your-driver.test.ts` following FileDriver test patterns
5. Update configuration example in `config/` if needed
6. Consider supporting path jailing for security (like FileDriver does)

### Modifying FileDriver

1. Edit `lib/drivers/file-driver.ts`
2. Update corresponding tests in `test/file-driver.test.ts`
3. If adding public methods, update JSDoc comments
4. Run `npm run test-file-driver` to verify changes
5. Run `npm test` to ensure no regressions

### Adding Configuration Features

1. Update type definitions in `lib/config.ts`
2. Update Storage initialization logic in `lib/storage.ts`
3. Add tests in `test/storage.test.ts`
4. Update example config in `config/filesystem.js`
5. Document in README.md

### Running a Single Test File

```bash
npx mocha test/file-driver.test.ts --require ts-node/register
```

### Debugging Tests

```bash
# Run with verbose output
npm test -- --reporter spec

# Run specific test suite
npm test -- --grep "FileDriver"
```

## Important Files to Know

- `lib/storage.ts`: Core singleton manager - start here to understand API flow
- `lib/drivers/file-driver.ts`: Main FileDriver implementation
- `test/file-driver.test.ts`: Largest test suite, shows usage patterns
- `lib/config.ts`: Configuration type definitions
- `package.json`: Build scripts and dependencies
- `.mocharc.json`: Test runner configuration

## Release and Publishing

- Releases are automated via GitHub Actions on main branch
- Publishing to npm requires `NPM_AUTH_TOKEN` secret in GitHub
- Version bumping handled by merge-release action
- Ensure all tests pass before merging to main

## Driver Installation and Configuration

### FileDriver (Built-in)
- Included with TypeFS installation
- No additional npm package needed
- Configure with:
  ```typescript
  {
    driver: 'file',
    root: '/absolute/path/to/directory',
    jail: true  // Always recommended for security
  }
  ```

### Additional Drivers (S3, etc.)
- Require separate npm installation (e.g., `npm install typefs-s3-driver`)
- Register with: `Storage.registerDriver('s3', S3Factory)`
- See individual driver documentation for configuration options
- All drivers must implement the full DiskDriver API

## External Resources

- **Documentation**: https://typefs.io/
  - Installation: https://typefs.io/docs/getting-started/installation
  - Configuration: https://typefs.io/docs/getting-started/configuration
  - File Driver: https://typefs.io/docs/drivers/file
  - DiskDriver API: https://typefs.io/docs/api/disk-driver
- **GitHub**: https://github.com/daniel-samson/typefs
- **npm**: https://www.npmjs.com/package/typefs
- **Roadmap**: https://github.com/daniel-samson/typefs/projects
