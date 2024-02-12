import { fluxo_principal } from "./scenarios/fluxoPrincipal.ts";

export const options = {

  scenarios: {
    executor1: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      exec: "executor",
    },
  },

  // scenarios: {
  //   executor1: {
  //     executor: "constant-vus",
  //     vus: 2,
  //     duration: "10s",
  //     exec: "executor",
  //   },
  // },
  thresholds: {
    "http_req_duration": ["p(95)<300"],
    "http_req_duration{type:news}" : ["p(95)<50"],
    "http_req_duration{type:login}" : ["p(95)<50"],
    "checks{type:login}": ["rate>0.50"],
  },
  ext: {
    loadimpact: {
      distribution: {
        distributionLabel: { loadZone: 'amazon:br:sao paulo', percent: 100 },
      },
      drop_metrics: [
        "http_req_blocked",
        "http_req_connecting",
        "http_req_receiving",
        "http_req_sending",
        "http_req_tls_handshaking",
        "http_req_waiting"
      ],
      drop_tags: {
        "http_req_duration": ["instance_id"],
        "http_reqs": ["instance_id"],
        "http_req_failed": ["instance_id"],
        "checks": ["instance_id"]
      }
    },
  },
};

export function executor() {
  fluxo_principal();
}
