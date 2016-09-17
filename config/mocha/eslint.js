import glob from 'glob';
import { CLIEngine } from 'eslint';
import { assert } from 'chai';

const paths = glob.sync('./src/**/!(*.spec).js');
const engine = new CLIEngine({
    envs: ['node', 'mocha'],
    useEslintrc: true
});
const results = engine.executeOnFiles(paths).results;

describe('ESLint', function() {
    results.forEach((result) => generateTest(result));
});

function generateTest(result) {
    const { filePath, messages, errorCount } = result;

    it(`validates ${filePath}`, function() {
        if (messages.length > 0 && errorCount > 0) {
            assert.fail(false, true, formatMessages(messages));
        }
    });
}

function formatMessages(messages) {
    const errors = messages.map((message) => {
        return `${message.line}:${message.column} ${message.message.slice(0, -1)} - ${message.ruleId}\n`;
    });

    return `\n${errors.join('')}`;
}