import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Parameters
beta = 0.3   # Transmission rate
gamma = 0.1  # Recovery rate
N = 1000     # Total population

# Initial conditions: S0, I0, R0
S0 = 999
I0 = 1
R0 = 0
initial_conditions = [S0, I0, R0]

# Time points
t = np.linspace(0, 160, 160)

# SIR model differential equations
def sir_model(y, t, beta, gamma, N):
    S, I, R = y
    dSdt = -beta * S * I / N
    dIdt = beta * S * I / N - gamma * I
    dRdt = gamma * I
    return [dSdt, dIdt, dRdt]

# Solve the system of ODEs
solution = odeint(sir_model, initial_conditions, t, args=(beta, gamma, N))
S, I, R = solution.T

# Plotting
plt.figure(figsize=(10, 6))
plt.plot(t, S, label='Susceptible')
plt.plot(t, I, label='Infected')
plt.plot(t, R, label='Recovered')
plt.xlabel('Time (days)')
plt.ylabel('Population')
plt.title('SIR Model Simulation')
plt.legend()
plt.grid(True)
plt.show()
