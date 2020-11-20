# PR Labels Github Action

A github action that extracts labels from the PR that this build belongs to and make them available to other actions.

## Outputs

### `labels`

The labels on this PR. A dictionary containing `true` where a label exists

## Example usage

```yaml
- id: pr-labels
  uses: joerick/pr-labels-action@v1.0.0
```
