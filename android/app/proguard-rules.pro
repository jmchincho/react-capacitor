# Mantener todo lo de Conscrypt
-keep class org.conscrypt.** { *; }
-dontwarn org.conscrypt.**

# Ignorar las referencias internas que no están disponibles en el entorno de build
-dontwarn com.android.org.conscrypt.**
-dontwarn org.apache.harmony.xnet.provider.jsse.**
