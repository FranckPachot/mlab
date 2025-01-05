{
 curl -s localhost:9216/metrics
 sleep 60
 curl -s localhost:9216/metrics
} | awk '
/^mongodb/ {
 k=$1
 if ( exists x[k] ) {
  sub(/{/," &",$0)
  if ( $NF-x[k]) printf "%15.1f/s %-60s %s\n", ($NF-x[k])/60,$1,$2
 } else {
 x[k]=$NF
 }
}
' | sort -n | grep --color=auto -E "^|opcounters"

