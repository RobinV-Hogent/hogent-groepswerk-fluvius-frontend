const InfoCard = ({ title, value }) => {
  return (
    <div className="info-card" data-cy="info_card">
      <div className="info-card-title">
        {title}
        <span className="info-card-value">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
