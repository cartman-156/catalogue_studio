/**
 * Field Registry - Central location for registering field types
 * This allows new field types to be added by editing only this file
 */

import { FieldConfig, FieldType } from '@/types';
import StringField from '@/components/fields/StringField';
import NumberField from '@/components/fields/NumberField';
import BooleanField from '@/components/fields/BooleanField';
import ArrayField from '@/components/fields/ArrayField';
import ObjectField from '@/components/fields/ObjectField';

/**
 * Registry of all available field types
 * To add a new field type:
 * 1. Create a new component in src/components/fields/
 * 2. Import it above
 * 3. Add an entry to this object
 */
export const fieldRegistry: Record<FieldType, FieldConfig> = {
  string: {
    type: 'string',
    label: 'Text',
    component: StringField,
  },
  number: {
    type: 'number',
    label: 'Number',
    component: NumberField,
  },
  boolean: {
    type: 'boolean',
    label: 'Boolean',
    component: BooleanField,
  },
  array: {
    type: 'array',
    label: 'Array',
    component: ArrayField,
  },
  object: {
    type: 'object',
    label: 'Object',
    component: ObjectField,
  },
};

/**
 * Get field configuration by type
 */
export const getFieldConfig = (type: FieldType): FieldConfig => {
  const config = fieldRegistry[type];
  if (!config) {
    throw new Error(`Unknown field type: ${type}`);
  }
  return config;
};

/**
 * Get all registered field types
 */
export const getAvailableFieldTypes = (): FieldType[] => {
  return Object.keys(fieldRegistry) as FieldType[];
};
