# bradfield_csi_takehome

Answers to my Bradfield CSI take home exericse. My answers to the Wireshark and Dynamo questions are located [here](https://github.com/ksaldana1/bradfield_csi_takehome/blob/master/Bradfield%20CSI%20Questions.pdf).

To verify the coding exercises, clone this repo and run `npm install` to download the depdendencies.

There are two scripts to run each exercise individually:

> npm run start / npm run start:server
> 
> Starts an http server at http://localhost:5555. Serves a single endpoint `/?timezone={timeZoneString}` (eg. http://localhost:5555/?timezone=America/Los_Angeles). Defaults to UTC if given [invalid time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) or no time zone.


> npm run start:utf
>
> Runs assertion suite in [UTF character length file](https://github.com/ksaldana1/bradfield_csi_takehome/blob/master/src/utfCharacterLength.ts)
