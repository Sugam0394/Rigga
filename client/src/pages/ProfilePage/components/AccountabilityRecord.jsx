 import "./AccountabilityRecord.css";

const AccountabilityRecord = ({
  record,
}) => {
  if (!record) {
    return (
      <section className="accountability-record">
        <h2>
          Accountability Record
        </h2>

        <p>
          Your accountability
          record will grow as
          you create,
          complete, and honor
          your commitments.
        </p>
      </section>
    );
  }

  return (
    <section className="accountability-record">
      <h2>
        Accountability Record
      </h2>

      <div>
        <p>
          Total Commitments
        </p>

        <strong>
          {record.total}
        </strong>
      </div>

      <div>
        <p>
          Active
        </p>

        <strong>
          {record.active}
        </strong>
      </div>

      <div>
        <p>
          Completed
        </p>

        <strong>
          {record.completed}
        </strong>
      </div>

      <div>
        <p>
          Failed
        </p>

        <strong>
          {record.failed}
        </strong>
      </div>
    </section>
  );
};

export default AccountabilityRecord;