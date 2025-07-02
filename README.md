# Deprecated Action

This action provides a way to manage deprecation warnings and errors in your GitHub workflows. It will display a warning message for a specified period and then switch to an error message, failing the workflow.

## Inputs

- `start-date` (required): The date when the deprecation period begins, in `YYYY-MM-DD` format.
- `days-till-error` (optional, default: `30`): The number of days from the `start-date` until the action starts throwing an error.
- `warning-message` (required): The message to be displayed as a warning. Markdown is supported.
- `error-message` (required): The message to be displayed as an error. Markdown is supported.

## Outputs

- `deprecation-message`: The full warning or error message.

## Usage

```yaml
- name: Check for deprecation
  uses: klojtas/deprecated-action@v1
  with:
    start-date: '2025-08-01'
    days-till-error: '60'
    warning-message: |
      ### Warning: This feature is being deprecated!
      It will be removed in a future version.
      Please see [the documentation](https://example.com) for migration steps.
    error-message: |
      ### Error: This feature has been removed!
      Please update your workflow to use the new version.
      See [the documentation](https://example.com) for more details.
```

## Common Use Cases

This action is useful in a variety of scenarios where you need to communicate a planned change to your workflow users.

- **Deprecating a reusable workflow:** Inform users that a reusable workflow is being replaced by a new one.
  ```yaml
  - name: Legacy Workflow Deprecation Notice
    uses: klojtas/deprecated-action@v1
    with:
      start-date: '2025-09-01'
      days-till-error: 90
      warning-message: |
        ### :warning: This workflow is being deprecated!
        Please migrate to the new `new-workflow.yml` by December 1st, 2025.
        See the [migration guide](https://your-org.com/migration-guide) for details.
      error-message: |
        ### :x: This workflow has been removed!
        It was deprecated on September 1st, 2025, and is no longer supported.
        Please use `new-workflow.yml` instead.
  ```

- **Deprecating an action input:** Warn users that a specific input for an action will be removed or renamed.
  ```yaml
  - name: Check for deprecated 'old-input'
    if: ${{ github.event.inputs.old-input }}
    uses: klojtas/deprecated-action@v1
    with:
      start-date: '2025-10-15'
      days-till-error: 30
      warning-message: "The `old-input` parameter is deprecated and will be removed. Please use `new-input` instead."
      error-message: "The `old-input` parameter has been removed. Please use `new-input`."
  ```

- **Notifying about outdated tools or dependencies:** Let users know that a certain version of a tool (like Node.js) or a dependency is no longer supported.
  ```yaml
  - name: Node.js 18 Deprecation Notice
    if: startsWith(steps.node-version.outputs.version, '18.')
    uses: klojtas/deprecated-action@v1
    with:
      start-date: '2025-07-01'
      days-till-error: 60
      warning-message: "Node.js 18 is approaching its end-of-life. Please upgrade your workflow to use Node.js 20 or later."
      error-message: "Node.js 18 is no longer supported by this workflow. Please upgrade to Node.js 20 or later."
  ```

- **Announcing breaking changes:** Give a heads-up about upcoming breaking changes in a script or tool used in the workflow.
  ```yaml
  - name: Breaking Change Announcement
    uses: klojtas/deprecated-action@v1
    with:
      start-date: '2026-01-01'
      days-till-error: 45
      warning-message: "A breaking change to the deployment script is scheduled for mid-February 2026. Please review the upcoming changes in the [announcement](https://your-org.com/announcements/breaking-change-q1-2026)."
      error-message: "The deployment script has been updated with breaking changes. Please update your configuration."
  ```

## Testing

This repository includes two sample workflows for testing:

- `.github/workflows/manual-test.yml`: Can be triggered manually to test the action.
- `.github/workflows/push-test.yml`: Runs automatically on every push to the `main` branch.

## Community

- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Governance](.github/GOVERNANCE.md)