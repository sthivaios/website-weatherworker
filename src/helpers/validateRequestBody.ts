// this is a disgusting function that validates the body in a post request against the expected format
// i should really use something like zod but i dont wanna add a bunch of dependencies to this
// so you'll have to live with this crap:

type ExpectedBodyFormat = {
	sensor: string;
	value: number;
	timestamp: Date;
};

export function isExpectedBodyFormat(obj: any): obj is ExpectedBodyFormat {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		typeof obj.sensor === 'string' &&
		typeof obj.value === 'number' &&
		typeof obj.timestamp == 'string'
	);
}
