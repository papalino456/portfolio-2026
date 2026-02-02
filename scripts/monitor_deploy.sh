#!/bin/bash
# monitor_deploy.sh - Polls GitHub Actions for the latest run status (no jq version)

REPO="papalino456/portfolio-2026"
MAX_RETRIES=15
SLEEP_TIME=20

echo "Starting deployment monitor for $REPO..."

for ((i=1; i<=MAX_RETRIES; i++)); do
    RUN_JSON=$(gh run list --repo "$REPO" --limit 1 --json databaseId,status,conclusion)
    
    # Parse JSON using Python
    ID=$(echo "$RUN_JSON" | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['databaseId'])")
    STATUS=$(echo "$RUN_JSON" | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['status'])")
    CONCLUSION=$(echo "$RUN_JSON" | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['conclusion'])")

    echo "[Attempt $i] Run $ID is currently: $STATUS ($CONCLUSION)"

    if [ "$STATUS" == "completed" ]; then
        if [ "$CONCLUSION" == "success" ]; then
            echo "DEPLOY_SUCCESS"
            exit 0
        else
            echo "DEPLOY_FAILED"
            gh run view "$ID" --repo "$REPO" --log-failed | head -n 50
            exit 1
        fi
    fi

    sleep $SLEEP_TIME
done

echo "DEPLOY_TIMEOUT"
exit 2
