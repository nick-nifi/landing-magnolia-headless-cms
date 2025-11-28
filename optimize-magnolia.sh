#!/bin/bash
# Script to optimize Magnolia startup time

MAGNOLIA_HOME="/usr/src/app/.magnolia/apache-tomcat"
PROPERTIES_FILE="$MAGNOLIA_HOME/webapps/magnoliaAuthor/WEB-INF/config/default/magnolia.properties"
SETENV_FILE="$MAGNOLIA_HOME/bin/setenv.sh"

echo "Optimizing Magnolia configuration for faster startup..."

# 1. Disable bootstrap samples (major speedup)
if [ -f "$PROPERTIES_FILE" ]; then
    echo "Disabling bootstrap samples..."
    sed -i 's/^magnolia.bootstrap.samples=true/magnolia.bootstrap.samples=false/' "$PROPERTIES_FILE"
    
    # Also ensure UTF-8 is disabled if not needed
    sed -i 's/^magnolia.utf8.enabled=true/magnolia.utf8.enabled=false/' "$PROPERTIES_FILE"
    
    echo "✓ Bootstrap samples disabled"
else
    echo "⚠ Properties file not found: $PROPERTIES_FILE"
fi

# 2. Optimize JVM settings for faster startup
if [ -f "$SETENV_FILE" ]; then
    echo "Optimizing JVM settings..."
    
    # Increase initial heap size for faster startup
    sed -i 's/-Xms64M/-Xms512M/' "$SETENV_FILE"
    
    # Add JVM optimizations for faster startup
    if ! grep -q "UseG1GC" "$SETENV_FILE"; then
        sed -i '/export CATALINA_OPTS=/a\export CATALINA_OPTS="$CATALINA_OPTS -XX:+UseG1GC -XX:MaxGCPauseMillis=200"' "$SETENV_FILE"
    fi
    
    # Disable JIT compilation logging
    if ! grep -q "DisableAttachMechanism" "$SETENV_FILE"; then
        sed -i '/export CATALINA_OPTS=/a\export CATALINA_OPTS="$CATALINA_OPTS -XX:+DisableAttachMechanism"' "$SETENV_FILE"
    fi
    
    echo "✓ JVM settings optimized"
else
    echo "⚠ Setenv file not found: $SETENV_FILE"
fi

echo "Optimization complete!"

