# -*- coding: utf-8 -*-
# Adapted from NeurotechX tutorial

import numpy as np
import os
from tqdm import tqdm
import tensorflow as tf
from tensorflow import keras
from sklearn.utils import shuffle


"""LOAD DATA"""

# Set the directory names
DATA_DIR_A = './Set A/'
# DATA_DIR_B = './Set B/'
# DATA_DIR_C = './Set C/'
# DATA_DIR_D = './Set D/'
DATA_DIR_E = './Set E/'

# Assign numerical labels to each class of data. 
# In our case, we have two possible labels (A vs E).
LABEL_A = 0
LABEL_E = 1

"""
Returns a list of all of our data. Each element in the 
list is a tuple consisting of an EEG data recording (4096 points) 
and its associated label (Set A or Set E).
"""
def load_data():
    labeled_data = []
    non_seizure_data = []
    seizure_data = []

    for fname in tqdm(os.listdir(DATA_DIR_A)):
        data = np.loadtxt(DATA_DIR_A + fname)
        labeled_data.append([np.array(data), LABEL_A])
        non_seizure_data.append([np.array(data), LABEL_A])
        
    for fname in tqdm(os.listdir(DATA_DIR_E)):
        data = np.loadtxt(DATA_DIR_E + fname)
        labeled_data.append([np.array(data), LABEL_E])
        seizure_data.append([np.array(data), LABEL_E])
        
    return [labeled_data, non_seizure_data, seizure_data]

loaded_labeled_data = load_data()
all_data = loaded_labeled_data[0]
non_seizure_data = loaded_labeled_data[1]
seizure_data = loaded_labeled_data[2]

print(f"There are {len(all_data)} files.")
# print(all_data[0])


"""PROCESS DATA"""


shuffled_data = shuffle(all_data)

# Use 80% of the data to be used as training data.
nb_train = round(len(shuffled_data) * 0.8)
data_train = shuffled_data[0:nb_train]
data_test = shuffled_data[nb_train:]

# Split the data into X (input) and Y (expected output)
# and stack it as a single array
X_train = np.array([d[0] for d in data_train])
Y_train = np.array([d[1] for d in data_train])

X_test = np.array([d[0] for d in data_test])
Y_test = np.array([d[1] for d in data_test])

# print(X_train.shape)
# print(Y_train.shape)

# Add an extra dimension to convert each sample into an 
# array that can be fed into the neural network
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
Y_train = Y_train.reshape(Y_train.shape[0], 1)

X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
Y_test = Y_test.reshape(Y_test.shape[0], 1)

# print(X_test.shape)
# print(Y_test.shape)


"""TRAINING"""

import my_model
import constants

"""
Train the model and save the model to disk.
"""
def train():
    model = my_model.create_model(X_train)
    history = model.fit(X_train, Y_train, validation_split=0.2, batch_size=constants.BATCH_SIZE, epochs=constants.NB_EPOCH)
    # list all data in history
    print(history.history.keys())
    model.save('saved_model/my_model.h5')
    return history

"""
Evaluate the model on the test data.
"""
def evaluate_model():
    model = tf.keras.models.load_model('saved_model/my_model.h5')
    model.evaluate(X_test, Y_test, batch_size=constants.BATCH_SIZE)
    # print('Restored model, accuracy: {:5.2f}%'.format(100 * acc))
    results = model.predict(X_test[2].reshape(1, 4097, 1))
    print(results)

"""
data_index: integer from 0 to 39
returns: integer from 0 to 1
"""
def predict_label():
    data_index = np.random.randint(0, len(X_test))
    print(data_index)
    model = tf.keras.models.load_model('saved_model/my_model.h5')
    results = model.predict(X_test[data_index].reshape(1, 4097, 1))
    formated_percentage = round(results[0][0] * 100, 2)
    return formated_percentage

"""
data_index: integer from 0 to 99
"""
def get_random_seizure_data():
    data_index = np.random.randint(0, len(seizure_data))
    fetched = seizure_data[data_index][0]
    print("Fetched seizure data: " + str(fetched))
    return fetched.tolist()

"""
data_index: integer from 0 to 99
"""
def get_random_non_seizure_data():
    data_index = np.random.randint(0, len(non_seizure_data))
    fetched = non_seizure_data[data_index][0]
    print("Fetched non-seizure data: " + str(fetched))
    return fetched.tolist()

"""
Returns an array of length 4097 randomly (seizure or non-seizure)
"""
def get_random_data():
    data_index = np.random.randint(0, len(all_data))
    fetched = all_data[data_index][0]
    print("Fetched random data: " + str(fetched))
    return fetched.tolist()

"""
Returns all of the seizure data.
"""
def get_all_seizure_data():
    new_data = np.array([d[0] for d in seizure_data])
    print("Fetched all seizure data" + str(new_data))
    return new_data.tolist()

"""
Returns all of the non-seizure data.
"""
def get_all_non_seizure_data():
    new_data = np.array([d[0] for d in non_seizure_data])
    print("Fetched all non-seizure data" + str(new_data))
    return new_data.tolist()

if __name__ == "__main__":
    get_all_seizure_data()

