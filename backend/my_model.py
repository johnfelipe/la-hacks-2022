"""## Building the Model

Finally, we are able to build our neural network. Here, we are using ```keras```, a high level API that allows for quick development of neural networks. The ```Sequential``` model lets us add layers incrementally to design the model and then create it using the ```compile``` method. 

Feel free to play around with the layers themselves as well as the parameters that are associated with them, and be sure to check out the [Keras API Reference](https://keras.io/api/) for more details on the different layers you can add.
"""

from keras.models import Sequential
from keras.layers import Input, Dense, Dropout, Activation
from keras.layers import Embedding
from keras.layers import LSTM


def create_model(X_train):
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

    print(model.summary())

    return model