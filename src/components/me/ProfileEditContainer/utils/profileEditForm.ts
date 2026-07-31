import type { ProfileEditSchemaType } from '@/utils/schema';

type DirtyProfileFields = Partial<Record<keyof ProfileEditSchemaType, unknown>>;

export const getDirtyProfileUpdates = (
	data: ProfileEditSchemaType,
	dirtyFields: DirtyProfileFields
): Partial<ProfileEditSchemaType> => {
	const dirtyFieldKeys = Object.keys(dirtyFields) as Array<keyof ProfileEditSchemaType>;

	return dirtyFieldKeys.reduce((updates, key) => {
		const value = data[key];

		if (value === undefined) return updates;

		return { ...updates, [key]: value };
	}, {} as Partial<ProfileEditSchemaType>);
};

export const hasDirtyProfileFields = (dirtyFields: DirtyProfileFields) => Object.keys(dirtyFields).length > 0;
