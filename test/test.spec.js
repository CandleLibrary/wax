/**[API]:testing
 * 
 * Test for argument parsing. 
 * 
 * NodeJS process.argv is an array of strings, so
 * that structure is recreated in this test by munging
 * the argv structure to make sure we're dealing with 
 * authentic argv test data. The first to args are the 
 * process name and cwd, so these will be empty strings
 * in the test data.
 * 
 * Input:
 * `{empty-string} {empty-string} --test "test value" --value uncaptured -abt timeout --data=./data/dir"`
 * 
 * Reference:
 * https://nodejs.org/docs/latest/api/process.html#process_process_argv
 */

import { getProcessArgs } from "@candlefw/wax";

import assert from "assert";

process.argv.length = 0;
process.argv.push("", "", "--test", `"test value"`, "--value", "uncaptured  ", "-abt", "timeout", "--data", "=./data/dir");

/**[ADDENDUM]
 * The passed data is a list of anticipated arguments
 * and a boolean indicated if there should be arguments
 * for a givin key, or a string value indicating the argument
 * is an alias of another key.
 */
const args = getProcessArgs({
    test: true,
    t: "test",
    value: false,
    data: false
});

assert(typeof args.test.val == "string");
assert(typeof args.value.val == "boolean");
assert(typeof args.data.val == "string");
assert(typeof args.a.val == "boolean");
assert(typeof args.t.val == "string");
assert(typeof args.timeout == "undefined");

assert(args.value.val == true);
assert(args.test.val == "timeout");
assert(args.data.val == "./data/dir");

