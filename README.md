# Deprecated Action

This action provides a way to manage deprecation warnings and errors in your GitHub workflows. It will display a warning message for a specified period and then switch to an error message, failing the workflow.

## Inputs

- `start-date` (required): The date when the deprecation period begins, in `YYYY-MM-DD` format.
- `days-till-error` (optional, default: `30`): The number of days from the `start-date` until the action starts throwing an error.
- `warning-message` (required): The message to be displayed as a warning or an error.

## Outputs

- `deprecation-message`: The full warning or error message.

## Usage

```yaml
- name: Check for deprecation
  uses: ./ # Replace with your-username/deprecated-action@v1
  with:
    start-date: '2025-08-01'
    days-till-error: '60'
    warning-message: 'This feature will be removed in a future version.'
```

## Testing

This repository includes two sample workflows for testing:

- `.github/workflows/manual-test.yml`: Can be triggered manually to test the action.
- `.github/workflows/push-test.yml`: Runs automatically on every push to the `main` branch.