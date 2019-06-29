Command = require '../../command'
Protocol = require '../../protocol'

class BackupCommand extends Command

  RE_OK = /Now unlock your device and confirm the backup operation.../
  execute: (file) ->
    this._send "host:backup-apk-shared-all-f:#{file}"
    @parser.readAscii 4
      .then (reply) =>
        switch reply
          when Protocol.OKAY
            @parser.readValue()
              .then (value) ->
                if RE_OK.test value
                else
                  throw new Error value.toString()
          when Protocol.FAIL
            @parser.readError()
          else
            @parser.unexpected reply, 'OKAY or FAIL'

module.exports = BackupCommand
