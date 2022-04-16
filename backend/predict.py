from keras.models import Sequential

checkpoint_path = "training_1/cp.ckpt"
checkpoint_dir = os.path.dirname(checkpoint_path)

from keras.models import Sequential
from keras.layers import Input, Dense, Dropout, Activation
from keras.layers import Embedding
from keras.layers import LSTM
from keras.callbacks import ModelCheckpoint

hidden_size = 64

# Initialize the model
model = Sequential()

# Specify the input to the model 
model.add(Input(shape=(X_train.shape[1], 1)))

# Add a Long Short-Term Memory Layer (form of RNN) with 64 neurons
model.add(LSTM(hidden_size))

# Add a Dropout Layer, which randomly sets inputs to 0 35% of the time
# This is a regularization technique commonly used to prevent overfitting
model.add(Dropout(0.35))

# Add a Dense Layer, which is a layer of neurons in a neural network that 
# receive inputs from all neurons from the previous layer. 
# In this case, this is our output layer.
model.add(Dense(1))

# Adds an Activation Layer, which simply provides an activation function
model.add(Activation('sigmoid'))

# Compile the model, specifying the loss function and optimizer to use
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['mae', 'acc'])


'''
Return the prediction result given 
'''
def predict(data):
    # Loads the weights
    model.load_weights(checkpoint_path)

    # Re-evaluate the model
    loss, acc = model.evaluate(test_images, test_labels, verbose=2)
    print("Restored model, accuracy: {:5.2f}%".format(100 * acc))

    return model.predict(data)
