import core from '@actions/core';
import github from '@actions/github';

try {
  core.setOutput('labels', github.context.payload?.pull_request?.labels);
} catch (error) {
  core.setFailed(error.message);
}
