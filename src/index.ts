import * as core from '@actions/core';
import * as github from '@actions/github';
import ansiColor from './ansiColor';

interface Label {
    color: string,
    default: boolean,
    description: string,
    name: string,
    node_id: string,
    url: string,
}

function main() {
    const labels: Label[]|undefined = github.context.payload?.pull_request?.labels
    const output: {[k: string]: true} = {}

    if (!labels) {
        core.info("Not a pull request")
        core.setOutput('labels', {})
        return;
    }

    if (labels.length == 0) {
        core.info("No labels found")
        core.setOutput('labels', {})
        return;
    }

    for (const label of labels) {
        const identifier = nameToIdentifier(label.name);
        const environmentVariable = nameToEnvironmentVariableName(label.name);

        core.exportVariable(environmentVariable, '1');
        core.info(`\nFound label ${ansiColor.startColor(label.color)} ${label.name} ${ansiColor.endColor()}.\n  Setting env var: ${environmentVariable}=1`)
        output[identifier] = true
    }

    core.info(`\nAction output:\nlabels: ${JSON.stringify(output)}`)
    core.setOutput('labels', output);
}

try {
    main();
} catch (error) {
    core.setFailed(error.message);
}

function nameToIdentifier(name: string) {
    return name
        .replace(/[^\w-]+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
}

function nameToEnvironmentVariableName(name: string) {
    return 'GITHUB_PR_LABEL_' + nameToIdentifier(name).toUpperCase().replace('-', '_');
}
