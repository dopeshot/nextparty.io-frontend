import { TaskType } from "../../src/overmind/game/state";
import { Gender } from "../../src/overmind/players/state";
import { getPossibleTasks } from "../../src/services/game/GameComponents";

// Docs here: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
// more here: https://github.com/chaijs/chai
describe("getPossibleTasks Unit tests", () => {
	before(() => {
		expect(getPossibleTasks).to.be.a("function");
	});

	it('should be empty if tasks are empty', () => {
		expect(getPossibleTasks([], {
			id: 0,
			gender: Gender.FEMALE,
			name: "Michael"
		}, TaskType.TRUTH)).to.be.an('array').that.is.empty
	})

	it('Just a random test', () => {
		expect(true).to.be.true
	})

});

export { };

