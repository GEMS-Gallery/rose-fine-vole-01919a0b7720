import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayerEntries : [(Text, TaxPayer)] = [];

  // Create a HashMap for efficient in-memory operations
  private var taxPayerMap = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Initialize the taxPayerMap with stored entries
  private func initTaxPayerMap() {
    for ((k, v) in taxPayerEntries.vals()) {
      taxPayerMap.put(k, v);
    };
  };

  // Call initTaxPayerMap when the canister is created
  initTaxPayerMap();

  // Add a new TaxPayer record
  public func addTaxPayer(taxPayer: TaxPayer) : async Result.Result<(), Text> {
    if (taxPayerMap.get(taxPayer.tid) != null) {
      return #err("TaxPayer with TID " # taxPayer.tid # " already exists");
    };
    taxPayerMap.put(taxPayer.tid, taxPayer);
    #ok(())
  };

  // Get all TaxPayer records
  public query func getTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayerMap.vals())
  };

  // Get a TaxPayer record by TID
  public query func getTaxPayerByTID(tid: Text) : async ?TaxPayer {
    taxPayerMap.get(tid)
  };

  // Update an existing TaxPayer record
  public func updateTaxPayer(taxPayer: TaxPayer) : async Result.Result<(), Text> {
    switch (taxPayerMap.get(taxPayer.tid)) {
      case (null) {
        #err("TaxPayer with TID " # taxPayer.tid # " not found")
      };
      case (?_) {
        taxPayerMap.put(taxPayer.tid, taxPayer);
        #ok(())
      };
    }
  };

  // Delete a TaxPayer record
  public func deleteTaxPayer(tid: Text) : async Result.Result<(), Text> {
    switch (taxPayerMap.remove(tid)) {
      case (null) {
        #err("TaxPayer with TID " # tid # " not found")
      };
      case (?_) {
        #ok(())
      };
    }
  };

  // System functions for upgrades
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayerMap.entries());
  };

  system func postupgrade() {
    initTaxPayerMap();
  };
}
