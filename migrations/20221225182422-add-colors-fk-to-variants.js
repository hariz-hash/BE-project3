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

exports.up =  function(db) {
  return db.addForeignKey('variants', 'colors', 'variants_colors_fk',
       {
        "color_id":"id"
      },
       {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
       })
}

exports.down = function(db) {
  db.removeForeignKey("variants", "variants_colors_fk");
}

exports._meta = {
  "version": 1
};
