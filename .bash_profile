export PATH=$PATH:/usr/local/bin
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
launchctl setenv STUDIO_JDK /library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk
export ANDROID_HOME="/Applications/Android/sdk"
export ANDROID_TOOLS="/Applications/Android/sdk/tools"
export ANDROID_PLATFORM_TOOLS="/Applications/Android/sdk/platform-tools"
PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS


export ANT_HOME="/Applications/Android/ant"
export PATH=$PATH:$ANT_HOME/bin

