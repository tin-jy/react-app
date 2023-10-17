var trials:number = 0;
var score:number = 0;

const inputs: number[] = [];
const probabilities: number[] = [];
const predictions: number[] = [];
const L4: [number, number][] = [];
const tracker: number[] = [];

function start() {
    inputs.length = 0;
    probabilities.length = 0;
    predictions.length = 0;
    L4.length = 0;
    tracker.length = 0;
    probabilities.push(0.5);
    predictions.push(predict(0.5));
    for (let i = 0; i < 16; i++) {
        L4.push([0, 0]);
    }
    trials = 0;
    score = 0;
}

function findProbability(count:number): number {
    if (count < 5) {
        return 0.5;
    }
    const index = inputs[count - 4] * 8 + inputs[count - 3] * 4 + inputs[count - 2] * 2 + inputs[count - 1];

    const success = L4[index][0];
    const trials = L4[index][1];

    if (trials === 0) {
        return 0.5;
    } else if (success === trials) {
        if (trials > 9) {
            return 1;
        }
        return 1 - Math.pow(0.5, trials);
    } else if (success === 0) {
        if (trials > 9) {
            return 0;
        }
        return Math.pow(0.5, trials);
    } else {
        return success / trials;
    }
}

function predict(prob: number): number {
    const threshold = Math.random();
    if (prob > threshold) {
        return 1;
    }
    return 0;
}

function update(data: number) {
    var correct = true;
    if (predictions[trials] !== data) {
        score += 1;
        correct = false;
        tracker.push(0)
    } else{
        tracker.push(1)
    }

    trials += 1;
    if (trials >= 5) {
        const index = inputs[trials - 5] * 8 + inputs[trials - 4] * 4 + inputs[trials - 3] * 2 + inputs[trials - 2];
        L4[index][0] += data;
        L4[index][1] += 1;
    }
    inputs.push(data);
    const prob = findProbability(trials);
    const pred = predict(prob);
    probabilities.push(prob);
    predictions.push(pred);

    pred === 0 ? console.log("Left") : console.log("Right")

    return correct;
}

export {start, update, trials, score, tracker};