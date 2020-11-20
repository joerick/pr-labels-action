import core from '@actions/core';
import github from '@actions/github';

try {
    const labels = github.context.payload?.pull_request?.labels
    core.debug(`PR labels: ${JSON.stringify(labels)}`)
    core.setOutput('labels', labels);
} catch (error) {
    core.setFailed(error.message);
}