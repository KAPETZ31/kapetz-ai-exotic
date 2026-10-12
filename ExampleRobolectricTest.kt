package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

  @Test
  fun `read string from context`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val appName = context.getString(R.string.app_name)
    assertEquals("KAPETZ AI", appName)
  }

  @Test
  fun `verify species database categories`() {
    val tarantulas = com.example.data.SpeciesDatabase.getByCategory(com.example.model.SpeciesCategory.TARANTULAS)
    val scorpions = com.example.data.SpeciesDatabase.getByCategory(com.example.model.SpeciesCategory.SCORPIONS)
    val centipedes = com.example.data.SpeciesDatabase.getByCategory(com.example.model.SpeciesCategory.CENTIPEDES)
    val reptiles = com.example.data.SpeciesDatabase.getByCategory(com.example.model.SpeciesCategory.REPTILES)

    assertTrue(tarantulas.isNotEmpty())
    assertTrue(scorpions.isNotEmpty())
    assertTrue(centipedes.isNotEmpty())
    assertTrue(reptiles.isNotEmpty())
  }
}
