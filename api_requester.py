import httplib, json

URL = "elections.huffingtonpost.com"
API = "/pollster/api/%s"

STATES = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
        "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
        "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
        "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
        "WI", "WY"
    ]

KNOWN_POLLS = [
        "obama-job-approval",
        "favorable-ratings",
        "2016-senate-dem-primary",
        "2016-senate",
        "2016-president-gop-primary",
        "2016-president-dem-primary",
        "2016-president",
        "2016-governor",
        "2014-senate-primary",
        "2014-senate-gop-primary",
        "2014-senate-dem-primary",
        "2014-senate",
        "2014-house",
        "2014-governor-gop-primary",
        "2014-governor-dem-primary",
        "2014-governor",
        "2013-senate-gop-primary",
        "2013-senate-dem-primary",
        "2013-senate",
        "2013-house",
        "2013-governor",
        "2012-senate-gop-primary",
        "2012-senate-dem-primary",
        "2012-senate",
        "2012-president-gop-primary",
        "2012-president", "2012-house",
        "2012-governor-gop-primary",
        "2012-governor-dem-primary",
        "2012-governor"
    ]

def get_data(query):
    conn = httplib.HTTPConnection(URL)
    conn.request("GET", API % (query))
    resp = conn.getresponse()
    try:
        return json.loads(resp.read().decode('utf-8'))
    except:
        return { "FAILED" : "Failed to get data for query : %s" % (query) }

def results_of(state, poll):
    results = []
    q = get_data("polls.json?state=%s&topic=%s" % (state, poll))
    for d in q:
        temp = {}
        for candidate in d["questions"][0]["subpopulations"][0]["responses"]:
            temp[str(candidate["choice"])] = str(candidate["value"])
        results.append(temp)
    return results

def get_all_results():
    all = {}
    for poll in KNOWN_POLLS:
        print "Getting data for %s" % (poll)
        all[poll] = {}
        for state in STATES:
            print "    Getting data for %s" % (state)
            all[poll][state] = results_of(state, poll)
    return all

def main():
    #charts = get_data("polls.json?topic=2016-president-gop-primary")
    #print charts[0]
    print results_of("NY","2016-president-gop-primary")
    # print get_all_results()

if __name__ == "__main__":
    main()

