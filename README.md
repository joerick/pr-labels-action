# PR Labels Github Action

![./screenshot.png]()

A Github action that extracts labels from the PR that this build belongs to, and makes them available to other actions. Labels are available as step outputs and environment variables that you can use in later steps in your action.

## Outputs

### `labels`

The labels on this PR. A dictionary containing `true` where a label exists

## Example usage

```yaml
jobs:
  test:
    steps:
      - name: Get PR labels
        id: pr-labels
        uses: joerick/pr-labels-action@v1.0.1
```

## How do I use this?

Perhaps you have a test that you only want to run when PR label `Test Flimbomble` is set. Your workflow should look like this:

```yaml
jobs:
  test:
    steps:
      - name: Get PR labels
        id: pr-labels
        uses: joerick/pr-labels-action@v1.0.1
      - run: |
          bin/run_normal_tests
          if [ -n "$GITHUB_PR_LABEL_TEST_FLIMBOMBLE" ]; then
            bin/run_flimbomble_tests
          fi
```
