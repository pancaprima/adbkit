Command = require '../../command'
Protocol = require '../../protocol'

class BackupCommand extends Command
  execute: (file) ->
    this._send "backup:-apk:-shared:-all:-f:#{file}"
    @parser.readAscii 4
      .then (reply) =>
        switch reply
          when Protocol.OKAY
            return
          when Protocol.FAIL
            @parser.readError()
          else
            @parser.unexpected reply, 'OKAY or FAIL'

module.exports = BackupCommand
