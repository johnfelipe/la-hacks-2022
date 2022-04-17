% Z001.txt : Epileptic Seizure EEG data

% S001.txt : Non-Epileptic EEG data

file = fopen("Z001.txt", "rt");
C = textscan(file, '%f');
fclose(file);
YR1 = cell2mat(C);
plot(YR1);

file2 = fopen("S001.txt", "rt");
C = textscan(file2, '%f');
fclose(file2);
YR2 = cell2mat(C);
plot(YR2);

