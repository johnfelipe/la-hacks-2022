"""## Visualizing the Data

To gain a better understanding of how the data is arranged, we will plot a few of the EEG signals.
"""

"""
Randomly sample four EEG signals from each set
and plot them.
"""
import random
import matplotlib.pyplot as plt  

plt.figure(figsize=(20, 10))

# Samples from Set A
samples_a = [] 
while len(samples_a) < 4:
  curr_idx = random.randint(0, len(all_data))
  if (all_data[curr_idx][1] == LABEL_A):
    samples_a.append(all_data[curr_idx][0])

# Samples from Set E
samples_e = []
while len(samples_e) < 4:
  curr_idx = random.randint(0, len(all_data))
  if (all_data[curr_idx][1] == LABEL_E):
    samples_e.append(all_data[curr_idx][0])

for i in range(0, 4):
  plt.subplot(4,2, 1 + i*2)
  plt.plot(samples_a[i])
  plt.subplot(4,2,2 + i*2)
  plt.plot(samples_e[i])

plt.suptitle('Class A vs Class E', fontsize=20)
plt.show()