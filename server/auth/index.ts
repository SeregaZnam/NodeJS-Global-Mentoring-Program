export const initializeStrategies = async () => {
   await import('./strategies/customStrategy');
   await import('./strategies/bearerStrategy');
};
