var BackupCommand, Command, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

BackupCommand = (function(superClass) {
  var RE_OK;

  extend(BackupCommand, superClass);

  function BackupCommand() {
    return BackupCommand.__super__.constructor.apply(this, arguments);
  }

  RE_OK = /Now unlock your device and confirm the backup operation.../;

  BackupCommand.prototype.execute = function(file) {
    this._send("host:backup-apk-shared-all-f:" + file);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readValue().then(function(value) {
              if (RE_OK.test(value)) {

              } else {
                throw new Error(value.toString());
              }
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return BackupCommand;

})(Command);

module.exports = BackupCommand;
