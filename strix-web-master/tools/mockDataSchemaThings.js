const schema = {
  type: 'object',
  properties: {
    things: {
      type: 'array',
      minItems: 2,
      maxItems: 3,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            chance: 'guid',
          },
          type: {
            enum: [
              'urn:things:vehicle',
            ],
          },
          info: {
            type: 'object',
            properties: {
              label: {
                enum: [
                  'Ford Azul',
                  'Peugeot Negro',
                  'Audio Blanco',
                ],
              },
            },
            required: [
              'label',
            ],
          },
          state: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  coordinates: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 1,
                    items: {
                      type: 'number',
                    },
                  },
                },
                required: [
                  'coordinates',
                ],
              },
              contact_on: {
                type: 'boolean',
              },
              speed: {
                type: 'integer',
                minimum: 40,
                maximum: 180,
                multipleOf: 2,
                exclusiveMinimum: false,
              },
            },
            required: [
              'contact_on',
              'speed',
              'location',
            ],
          },
          metadata: {
            type: 'object',
            properties: {
              state: {
                type: 'object',
                properties: {
                  location: {
                    type: 'object',
                    properties: {
                      timestamp: {
                        type: 'string',
                        chance: 'timestamp',
                      },
                    },
                    required: [
                      'timestamp',
                    ],
                  },
                },
                required: [
                  'location',
                ],
              },
            },
            required: [
              'state',
            ],
          },
          agents: {
            type: 'array',
            minItems: 2,
            enum: [
              'mrn:agent_type:speed_limit',
              'mrn:agent_type:parking_mode',
              'mrn:agent_type:geofence',
            ],
          },
        },
        required: [
          'id',
          'type',
          'info',
          'state',
          'metadata',
        ],
      },
    },
  },
  required: ['things'],
};

export default schema;
