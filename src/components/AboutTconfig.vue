<template>
  <div class="container text-left">
    <h1 class="md">TConfig - Test Configuration Generator</h1>
    <h2>Introduction</h2>
    <p>
      TConfig - the Test Configuration Generator - generates covering arrays for
      combinatorial coverage of parameters with discrete values.  An instance of
      this type of coverage is "pair-wise" coverage, which is that all pairs of
      parameter values are covered in at least one test configuration.
    </p>
    <p>
      For example,suppose that you had to test a Python program that offered a REST API
      and a browser client (such as this one &#127773;), and cross-platform functionality is a
      concern.  Here are four parameters of interest, and a set of values for each parameter.
    </p>
    <b-table size="sm" striped hover :items="parameters">
    </b-table>
    <hr>
    <p>
      Testing all possible combinations would require 3 &times; 4 &times; 4 &times; 3 = 144
      configurations.
    </p>
    <p>
      Suppose that it would be acceptable to include every pair-wise interaction
      in some test configuration, but that it is unlikely that there would be some issue
      that would only appear if there was a particular 3-way or 4-way combination of values.
      Then, a covering array of degree 2 would suffice.
    </p>
    <p>
      Here is a covering array of degree 2 for the above parameters and values.  It consists
      of only 16 configurations. Note that not all values are specified, as coverage is achieved
      without a particular value in some slot.  Of course, a value would typically need to be
      provided to complete the configuration, but any value will do.
    </p>
    <p>
      To check pair-wise coverage:  deselect columns until there are 2 columns left.  Verify
      that all possible combinations of the values for those 2 columns are contained within (at
      least one) configuration.
    </p>
    <b-row class="col-sm-12">
      <b-col class="col-sm-4 font-weight-bold">
        Show columns:
      </b-col>
      <b-col class="col">
        <b-checkbox
        :disabled="visibleFields.length == 2 && field.visible"
        v-for="field in configFields"
        :key="field.key"
        v-model="field.visible"
        inline>
        {{ field.label }}
        </b-checkbox>
      </b-col>
    </b-row>
  <br>
  <b-table size="sm" hover bordered :items="configurations" :fields="visibleFields">
  </b-table>
    <p>
      (***) - Any value can be used in these configurations; specific values are not needed
      for coverage purposes.
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    visibleFields() {
      return this.configFields.filter((field) => field.visible);
    },
  },
  data() {
    return {
      parameters: [
        {
          'Operating System': 'Windows',
          'Python Version': '3.6',
          'Browser name': 'Firefox',
          'DB Backend': 'SQLite',
        },
        {
          'Operating System': 'Linux',
          'Python Version': '3.7',
          'Browser name': 'Chrome',
          'DB Backend': 'MySQL',
        },
        {
          'Operating System': 'Mac OS',
          'Python Version': '3.8',
          'Browser name': 'Edge',
          'DB Backend': 'Postgres',
        },
        {
          'Operating System': '',
          'Python Version': '3.9',
          'Browser name': 'Safari',
          'DB Backend': '',
        },
      ],
      configFields: [
        { key: 'Operating System', label: 'OS', visible: true },
        { key: 'Python Version', label: 'Python Version', visible: true },
        { key: 'Browser name', label: 'Browser', visible: true },
        { key: 'DB Backend', label: 'DB', visible: true },
      ],
      configurations: [
        {
          'Operating System': 'Windows',
          'Python Version': '3.6',
          'Browser name': 'Firefox',
          'DB Backend': 'SQLite',
        },
        {
          'Operating System': 'Linux',
          'Python Version': '3.7',
          'Browser name': 'Chrome',
          'DB Backend': 'MySQL',
        },
        {
          'Operating System': 'Mac OS',
          'Python Version': '3.8',
          'Browser name': 'Edge',
          'DB Backend': 'Postgres',
        },
        {
          'Operating System': '***',
          'Python Version': '3.9',
          'Browser name': 'Safari',
          'DB Backend': '***',
        },
        {
          'Operating System': 'Windows',
          'Python Version': '3.7',
          'Browser name': 'Edge',
          'DB Backend': '***',
        },
        {
          'Operating System': 'Linux',
          'Python Version': '3.6',
          'Browser name': 'Safari',
          'DB Backend': 'Postgres',
        },
        {
          'Operating System': 'Mac OS',
          'Python Version': '3.9',
          'Browser name': 'Firefox',
          'DB Backend': 'MySQL',
        },
        {
          'Operating System': '***',
          'Python Version': '3.8',
          'Browser name': 'Chrome',
          'DB Backend': 'SQLite',
        },
        {
          'Operating System': 'Windows',
          'Python Version': '3.8',
          'Browser name': 'Safari',
          'DB Backend': 'MySQL',
        },
        {
          'Operating System': 'Linux',
          'Python Version': '3.9',
          'Browser name': 'Edge',
          'DB Backend': 'SQLite',
        },
        {
          'Operating System': 'Mac OS',
          'Python Version': '3.6',
          'Browser name': 'Chrome',
          'DB Backend': '***',
        },
        {
          'Operating System': '***',
          'Python Version': '3.7',
          'Browser name': 'Firefox',
          'DB Backend': 'Postgres',
        },
        {
          'Operating System': 'Windows',
          'Python Version': '3.9',
          'Browser name': 'Chrome',
          'DB Backend': 'Postgres',
        },
        {
          'Operating System': 'Linux',
          'Python Version': '3.8',
          'Browser name': 'Firefox',
          'DB Backend': '***',
        },
        {
          'Operating System': 'Mac OS',
          'Python Version': '3.7',
          'Browser name': 'Safari',
          'DB Backend': 'SQLite',
        },
        {
          'Operating System': '***',
          'Python Version': '3.6',
          'Browser name': 'Edge',
          'DB Backend': 'MySQL',
        },
      ],
    };
  },
};

</script>
