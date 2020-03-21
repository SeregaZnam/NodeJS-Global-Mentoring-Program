import logger from '../logger';

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const calculateExecutionTime = (time: number[]): number =>
	(time[0] * NS_PER_SEC + time[1]) / MS_PER_NS;

export const executionTime = () => (
	_target: any,
	_properyName: string,
	descriptor: PropertyDescriptor
) => {
	const fn = descriptor.value;

	if (typeof fn !== 'function') {
		throw new SyntaxError(`@executionTime can only be used on functions, not: ${fn}`);
	}

	return {
		...descriptor,
		async value() {
			const hrstart = process.hrtime();
			const result = await fn.apply(this, arguments);
			const hrend = process.hrtime(hrstart);

			logger.info(`method ${_properyName} worked in ${calculateExecutionTime(hrend)}ms`);
			return result;
		}
	};
};
