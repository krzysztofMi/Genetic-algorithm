import pandas as pd 
pd.set_option('display.max_columns', None) 
df=pd.read_csv("data.csv",sep='\t') 
y=df['Status'] 
df.drop('Status',axis=1,inplace=True)
df.drop('ID',axis=1,inplace=True)
df.drop('Recording',axis=1,inplace=True)
numberOfAtributtes=len(df.columns) 
print(numberOfAtributtes)