var BackupCommand, Command, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

BackupCommand = (function(superClass) {
  extend(BackupCommand, superClass);

  function BackupCommand() {
    return BackupCommand.__super__.constructor.apply(this, arguments);
  }

  BackupCommand.prototype.execute = function(file) {
    this._send("backup:-apk:-shared:-all:-f:" + file);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            break;
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
