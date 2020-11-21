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
    const labelsObject: {[k: string]: true} = {}

    if (!labels) {
        core.info("Not a pull request")
        core.setOutput('labels', '')
        core.setOutput('labels-object', null)
        return;
    }

    if (labels.length == 0) {
        core.info("No labels found")
        core.setOutput('labels', '')
        core.setOutput('labels-object', {})
        return;
    }

    for (const label of labels) {
        const identifier = nameToIdentifier(label.name);
        const environmentVariable = nameToEnvironmentVariableName(label.name);

        core.exportVariable(environmentVariable, '1');
        core.info(`\nFound label ${ansiColor.startColor(label.color)} ${label.name} ${ansiColor.endColor()}\n  Setting env var for remaining steps: ${environmentVariable}=1`)
        labelsObject[identifier] = true
    }

    const labelsString = ' ' + Object.keys(labelsObject).join(' ') + ' '

    core.info(`\nAction output:\nlabels: ${JSON.stringify(labelsString)}\nlabels-object: ${JSON.stringify(labelsObject)}`)
    core.setOutput('labels', labelsString);
    core.setOutput('labels-object', labelsObject);
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
