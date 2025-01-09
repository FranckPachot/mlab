#
# takes two snapshots from mongodb_exporter and show the diff
#  parameter: number of seconds
#  parameter: grep pattern
# result is ordered by falue
#
if [[ "$1" =~ ^-?[0-9]+$ ]]
then
 seconds=${1:-1}
 shift
fi
grep="$1"

{
 curl -s localhost:9216/metrics
 sleep $seconds
 curl -s localhost:9216/metrics
} | awk '
/^mongodb/ {
 k=$1
 if ( exists x[k] ) {
  sub(/{/," &",$0)
  gsub(del,"")
  if ( $NF-x[k]) printf "%15.1f/s %-60s %s\n", ($NF-x[k])/s,$1,$2
 } else {
 x[k]=$NF
 }
}
' del='[a-z_]+="",?' s=$seconds | sort -n | grep "$grep" | grep --color=auto -E "^|opcounters"

