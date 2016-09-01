package com.example.helloworld;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class MainActivity extends DroidGap {
    @Override
	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.bg_loading);
        super.loadUrl("file:///android_asset/www/index.html", 3000);
    }
}
