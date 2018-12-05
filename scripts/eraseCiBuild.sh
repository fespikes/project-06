#!/bin/sh
# reference https://gitlab.com/morph027/gitlab-ci-helpers/wikis/clean-up-build-artifacts

export PRIVATE_TOKEN="MTxauzrZLRzkDfEZ1NjA"
export BASE_URL="http://172.16.1.41:10080"
export PROJECT="929" # the project ID, can be found in trigger settings
export START_DATE=$1 # sets the start of the time range from which we're going to delete artifacts
export END_DATE="2017-01-01" # end of time range

if [[ -z "$START_DATE" ]]; then
  echo -e "\033[34m eraseCiBuild YYYY-MM-DD # will erase all build before that date \033[0m"
  exit 1
fi

BUILDS=$(curl -s -H "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" "${BASE_URL}/api/v3/projects/${PROJECT}/builds?per_page=1000" | jq -c '.[] | select(.status =="success") | select(.created_at < "'${START_DATE}'*") | select(.created_at > "'${END_DATE}'*") | {id} ' | grep -oE '[0-9]+')


echo $BUILDS
for BUILD in ${BUILDS}; do (curl -s --request POST --header "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" "${BASE_URL}/api/v3/projects/${PROJECT}/builds/${BUILD}/erase" | jq .) ; done
