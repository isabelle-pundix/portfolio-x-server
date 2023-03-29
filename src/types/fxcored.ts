
export interface PoolInfo {
    pool: {
        not_bonded_tokens: string;
        bonded_tokens: string;
    }
}

export interface CosmosAddressRes {
    cosmos_address: string;
    sequence: string;
    account_number: string;
}

export interface DelegatorTotalRewardsRes {
    rewards: [
        {
            validator_address: string,
            reward: [
                {
                    denom: string,
                    amount: string,
                }
            ]
        }
    ],
    total: [
        {
            denom: string,
            amount: string,
        }
    ]
}

export interface ValidatorsOfDelegatorRes {
    validators: string[]
}

export interface DelegatorDelegationsRes {
    delegation_responses: [
        {
            delegation: {
                delegator_address: string,
                validator_address: string,
                shares: string
            },
            balance: {
                denom: string,
                amount: string
            }
        }
    ],
    pagination: {
        next_key: string,
        total: string
    }
}

export interface ValidatorsInfoFullRes {
    validators: [
        {
            operator_address: string,
            consensus_pubkey: {
                type_url: string,
                value: string
            },
            jailed: boolean,
            status: string,
            tokens: string,
            delegator_shares: string,
            description: {
                moniker: string,
                identity: string,
                website: string,
                security_contact: string,
                details: string
            },
            unbonding_height: string,
            unbonding_time: string,
            commission: {
                commission_rates: {
                    rate: string,
                    max_rate: string,
                    max_change_rate: string
                },
                update_time: string
            },
            min_self_delegation: string
        }
    ],
    pagination: {
        next_key: string,
        total: string
    }
}

export interface ValidatorCommissionRes {
    commission: {
        commission: [
            {
                denom: string,
                amount: string
            }
        ]
    }
}

export interface ValidatorOutstandingRewardsRes {
    rewards: {
        rewards: [
            {
                denom: string,
                amount: string
            }
        ]
    }
}


export interface TxnLogsEvent {
    type: string;
    attributes: [
        {
            key: string;
            value: string;
        }
    ];
}

export interface NodeTxnEventsRes {
    txs: [
        {
            code: number;
            codespace: string;
            data: {
                data: [
                    {
                        msg_type: string
                    }
                ]
            };
            events: [
                {
                    attributes: [
                        {
                            index: boolean;
                            key: string;
                            value: string;
                        }
                    ]
                    type: string;
                }
            ];
            gas_used: number;
            gas_wanted: number;
            height: number;
            info: string;
            logs: [
                {
                    events: [
                        {
                            type: string;
                            attributes: [
                                {
                                    key: string;
                                    value: string
                                }
                            ]
                        }
                    ]
                }
            ];
            raw_log: string;
            timestamp: string;
            tx: {
                "@type": string;
                body: {
                    messages: [
                        {
                            "@type": string;
                            delegator_address: string;
                            validator_address: string;
                        }
                    ];
                    memo: string;
                    timeout_height: string;
                    extension_options: [];
                    non_critical_extension_options: [];
                };
                auth_info: {
                    signer_infos: [
                        {
                            public_key: {
                                "@type": string;
                                key: string;
                            };
                            mode_info: {
                                single: {
                                    mode: string;
                                }
                            };
                            sequence: string;
                        }
                    ];
                    fee: {
                        amount: [
                            {
                                denom: string;
                                amount: string;
                            }
                        ];
                        gas_limit: string;
                        payer: string;
                        granter: string;
                    }
                };
                signatures: string[];
            },
            txhash: string;
        }
    ]
}

export interface RestTxnEventsRes {
    txs: [
        {
            body: {
                messages: [
                    {
                        "@type": string;
                        delegator_address: string;
                        validator_address: string;
                    }
                ],
                memo: string;
                timeout_height: string;
                extension_options: [];
                non_critical_extension_options: [];
            };
            auth_info: {
                signer_infos: [
                    {
                        public_key: {
                            "@type": string;
                            key: string;
                        };
                        mode_info: {
                            single: {
                                mode: string;
                            }
                        };
                        sequence: string;
                    }
                ];
                fee: {
                    amount: [
                        {
                            denom: string;
                            amount: string;
                        }
                    ];
                    gas_limit: string;
                    payer: string;
                    granter: string;
                }
            };
            signatures: string[];
        }
    ];
    tx_responses: [
        {
            height: string;
            txhash: string;
            codespace: string;
            code: number;
            data: string;
            raw_log: string;
            logs: [
                {
                    msg_index: number;
                    log: string;
                    events: [
                        {
                            type: string;
                            attributes: [
                                {
                                    key: string;
                                    value: string;
                                }
                            ];
                        }
                    ];
                }
            ];
            info: string;
            gas_wanted: string;
            gas_used: string;
            tx: {
                "@type": string;
                body: {
                    messages: [
                        {
                            "@type": string;
                            delegator_address: string;
                            validator_address: string;
                        }
                    ];
                    memo: string;
                    timeout_height: string;
                    extension_options: [];
                    non_critical_extension_options: [];
                };
                auth_info: {
                    signer_infos: [
                        {
                            public_key: {
                                "@type": string;
                                key: string;
                            };
                            mode_info: {
                                single: {
                                    mode: string;
                                }
                            };
                            sequence: string;
                        }
                    ];
                    fee: {
                        amount: [
                            {
                                denom: string;
                                amount: string;
                            }
                        ];
                        gas_limit: string;
                        payer: string;
                        granter: string;
                    }
                };
                signatures: string[];
            };
            timestamp: string;
            events: [
                {
                    type: string;
                    attributes: [
                        {
                            key: string;
                            value: string;
                            index: boolean;
                        }
                    ];
                }
            ];
        }
    ];
    pagination: {
        next_key: string | null;
        total: string
    };
}