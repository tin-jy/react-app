import random

inputs = []
probabilities = []
predictions = []
L4 = []

count = 0


def setup():
    global inputs, probabilities, predictions, L4, count
    inputs.clear()
    probabilities.clear()
    predictions.clear()
    L4.clear()
    probabilities.append(0.5)
    predictions.append(predict(0.5))
    for i in range(16):
        L4.append([0, 0])
    count = 0


def find_probability():
    global count, inputs, L4
    if count < 5:
        return 0.5
    index = inputs[count - 4] * 8 + inputs[count - 3] * 4 + inputs[count - 2] * 2 + inputs[count - 1]

    # assert (index >= 0 and index < 16) 

    success = L4[index][0]
    trials = L4[index][1]

    if trials == 0:
        return 0.5
    elif success == trials:
        if trials > 9:
            return 1
        return 1 - 0.5 ** trials
    elif success == 0:
        if trials > 9:
            return 0
        return 0.5 ** trials
    else:
        return float(success) / trials
    

def predict(prob):
    threshold = random.random()
    if prob > threshold:
        return 1
    return 0


def update(data):
    global count, inputs, L4, probabilities, predictions

    # assert (data == 0 or data == 1)
    
    count += 1

    if count >= 5:
        index = inputs[count - 5] * 8 + inputs[count - 4] * 4 + inputs[count - 3] * 2 + inputs[count - 2]
        L4[index][0] += data
        L4[index][1] += 1

    inputs.append(data)
    prob = find_probability()
    pred = predict(prob)
    probabilities.append(prob)
    predictions.append(pred)

    return data, prob, pred


my_inputs = "0000"
setup()

for i in my_inputs:
    value = int(i)
    out = update(value)
    # print(out)

# print(inputs)
# print(probabilities)
# print(predictions)

num_of_points = len(inputs)
correct = 0
for i in range(num_of_points):
    if predictions[i] == inputs[i]:
        correct += 1
accuracy = float(correct) / num_of_points
print(f'Accuracy: {accuracy} in {num_of_points} inputs.')