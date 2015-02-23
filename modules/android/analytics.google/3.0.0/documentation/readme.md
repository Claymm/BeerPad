# Google Analytics Module

## Description

Connects to Google Analytics for app event tracking.

## Set up Google Analytics

First step: you have to create a new app property in your Google Analytics-account.

For more information see: http://support.google.com/analytics/bin/answer.py?hl=en&amp;answer=2587086&amp;topic=2587085&amp;ctx=topic

## Accessing the Analytics Module

To access this module from JavaScript, you would do the following:

`javascript
var GA = require("analytics.google");`

The GA variable is a reference to the Module object. To interact with the tracker, create a tracker instance using the `getTracker` method.

`javascript
var tracker = GA.getTracker("UA-1234567-8");
tracker.trackEvent({
  category: "Loading",
  action: "cancelled"
});`

## Reference

### getTracker(id)

Retrieve an analytics tracker object. Must pass the "UA-XXXXXXX-X" id string that you get from Google Analytics.

### Tracker.setUser(params)

Tracks a user sign in with an 'anonymous' identifier. You will be breaking Google's terms of service if you use any of the user's personal information (including email address).

*   userId : String (required)
*   category : String (required)
*   action : String (required)

### Tracker.trackEvent(params)

Tracks an event taking the following parameters:

*   category : String (required)
*   action : String (required)
*   label : String
*   value : Integer

### Tracker.trackSocial(params)

Tracks social interactions taking the following parameters:

*   network : String (e.g. facebook, pinterest, twitter) (required)
*   action : String (required)
*   target : String

### Tracker.trackTiming(params)

Tracks a timing taking the following parameters:

*   category : String (required)
*   time : Integer (in milliseconds) (required)
*   name : String
*   label : String

### Tracker.trackScreen(params)

Tracks a screen change using the screen's name.

*   screenName : String (required)

### Tracker.trackTransaction(params)

Tracks an ecommerce transaction.

*   transactionId : String (required)
*   affiliation : String (required)
*   revenue : Number (required)
*   tax : Number (required)
*   shipping : Number (required)
*   currency : String (e.g. USD, CAD)

### Tracker.trackTransactionItem(params)

Tracks an ecommerce transaction's item.

*   transactionId : String - should match transactionId in `trackTransaction` method. (required)
*   name : String (required)
*   sku : String (required)
*   category : String
*   price : Number (required)
*   quantity : Number (required)
*   currency : String (e.g. USD, CAD)

## Usage

`javascript
var GA = require('analytics.google');
var tracker = GA.getTracker("UA-XXXXXXX-X");
tracker.trackEvent({
  category: "my event category",
  action: "clicked",
  label: "how many (c)licks?",
  value: 3
});`

## Authors

[Matt Tuttle](https://github.com/MattTuttle "Matt Tuttle")
[Adam St. John](https://github.com/astjohn "Adam St. John")

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
