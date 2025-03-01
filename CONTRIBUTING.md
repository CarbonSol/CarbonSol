# Contributing to CarbonSol

Thank you for your interest in contributing to CarbonSol! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check the existing issues to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

When creating a bug report, please include as much detail as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or animated GIFs** if possible
- **Include details about your environment** (OS, browser, version, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **Include any relevant examples or mockups**

### Pull Requests

- Fill in the required template
- Follow the style guides
- Write meaningful commit messages
- Include appropriate tests
- Update documentation as needed

## Development Process

### Setting Up the Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/CarbonSol.git`
3. Add the original repository as upstream: `git remote add upstream https://github.com/CarbonSol/CarbonSol.git`
4. Create a new branch for your changes: `git checkout -b feature/your-feature-name`

### Development Workflow

1. Make your changes
2. Run tests to ensure your changes don't break existing functionality
3. Commit your changes with a meaningful commit message
4. Push your changes to your fork
5. Create a pull request

### Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md with details of changes if appropriate
3. The PR will be merged once it has been reviewed and approved by a maintainer

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Python Style Guide

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
- Use [Black](https://github.com/psf/black) for code formatting
- Use [Flake8](https://flake8.pycqa.org/en/latest/) for linting

### JavaScript Style Guide

- Follow the ESLint configuration in the frontend directory
- Use ES6 features when appropriate
- Prefer functional programming patterns

### Rust Style Guide

- Follow the [Rust Style Guide](https://doc.rust-lang.org/1.0.0/style/README.html)
- Use `cargo fmt` for code formatting
- Use `cargo clippy` for linting

### Documentation Style Guide

- Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation
- Reference functions, classes, and modules in code blocks
- Include examples when appropriate

## Testing

- Write tests for all new features and bug fixes
- Run the existing test suite before submitting a pull request
- Ensure all tests pass

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug`: Something isn't working
- `documentation`: Improvements or additions to documentation
- `enhancement`: New feature or request
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested
- `wontfix`: This will not be worked on

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute. 