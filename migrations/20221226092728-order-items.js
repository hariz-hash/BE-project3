'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('order_items',
  {
    id: {
      type: 'int',
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: 'smallint',
      unsigned: true,
      notNull: true,
    },
    order_id:
    {
            type: 'int',
            notNull: true,
            unsigned: true,
            foreignKey:{
              name:'order_items_order_fk',
              table:'orders',
              rules:{
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
              },
              mapping: 'id'
            }
    },
    variant_id:
    {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey:{
        name:'order_items_variant_fk',
        table:'variants',
        rules:{
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  })
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
